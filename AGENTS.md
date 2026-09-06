# Workspace rules

## ALWAYS keep the conversation compact (non-negotiable)
- Short, direct answers. No filler, no restating context, no long preambles.
- Never dump large file contents or command output into chat. Use targeted reads (offset/limit), narrow greps, and summarize instead.
- Keep tool use minimal: one precise command over several broad ones.
- Status updates: one line.
- Goal: chat should never grow large enough to force a reset.

## Never assume content is lost
- Past chats survive resets: `node "C:\Users\Cosmin\.dsh\tools\history-search.cjs" "query" [--full] [--all]` searches every session log (see the `chat-history` skill).
- Save anything important the user dictates (change lists, prompts) to a file in this repo the same turn (e.g. CHANGES.md). Chat memory is not durable.
