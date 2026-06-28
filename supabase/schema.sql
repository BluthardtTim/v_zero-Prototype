-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query)
-- before running `npm run seed`.
--
-- Uses its own table (space_context_events) and its own match function
-- (match_space_events) so it never collides with the Emb_Chat_v05
-- prototype's context_events table living in the same Supabase project.

create extension if not exists vector;

create table if not exists space_context_events (
  id text primary key,
  type text not null,
  content text not null,
  entities jsonb not null default '{}'::jsonb,
  raw_ref jsonb not null default '{}'::jsonb,
  embedding vector(1024),
  created_at timestamptz not null default now()
);

create or replace function match_space_events (
  query_embedding vector(1024),
  match_threshold float,
  match_count int
)
returns table (
  id text,
  type text,
  content text,
  entities jsonb,
  raw_ref jsonb,
  similarity float
)
language sql stable
as $$
  select
    space_context_events.id,
    space_context_events.type,
    space_context_events.content,
    space_context_events.entities,
    space_context_events.raw_ref,
    1 - (space_context_events.embedding <=> query_embedding) as similarity
  from space_context_events
  where 1 - (space_context_events.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;
