[Home](/) &gt; [fast-check](../fast-check.md) &gt; [modelRun](modelRun.md)

## modelRun variable

Run synchronous commands over a `Model` and the `Real` system

Throw in case of inconsistency

<b>Signature:</b>

```typescript
modelRun: <Model extends object, Real>(s: Setup<Model, Real>, cmds: Iterable<Command<Model, Real>> | CommandsIterable<Model, Real, void, false>) => void
```
