# Chat Images

Drop image files here that should appear as attachments inside chat message rows.

## How to reference in events.ts

Add a `chat_thumbnail` field to a `type: "chat_message"` event's `raw_ref`:

```ts
raw_ref: {
  type: "chat_message",
  // ...other fields...
  chat_thumbnail: "my_photo.jpg"   // filename, no path prefix
}
```

## How the model uses them

The space generator will pick up `chat_thumbnail` from each chat event and can attach
an `Image` node to the `attachment` slot of `MessageThreadRow` using the sentinel:

```
"photo:chat/my_photo.jpg"
```

This resolves to `/images/chat/my_photo.jpg` at runtime.

## Naming convention

Use lowercase snake_case filenames, e.g. `capri_selfie.jpg`, `dinner_view.jpg`.
