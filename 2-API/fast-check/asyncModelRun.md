[Home](/) &gt; [fast-check](../fast-check.md) &gt; [asyncModelRun](asyncModelRun.md)

## asyncModelRun variable

Run asynchronous commands over a `Model` and the `Real` system

Throw in case of inconsistency

<b>Signature:</b>

```typescript
asyncModelRun: <Model extends object, Real, CheckAsync extends boolean>(s: Setup<Model, Real> | AsyncSetup<Model, Real>, cmds: Iterable<AsyncCommand<Model, Real, CheckAsync>> | CommandsIterable<Model, Real, Promise<void>, CheckAsync>) => Promise<void>
```
