import * as assert from 'assert';
import * as fc from '../../../src/fast-check';

type Model = {
  current: { stepId: number };
  validSteps: number[];
};
type Real = {};

class SuccessCommand implements fc.Command<Model, Real> {
  check = (m: Readonly<Model>) => m.validSteps.includes(m.current.stepId++);
  run = (m: Model, r: Real) => {};
  toString = () => 'success';
}
class FailureCommand implements fc.Command<Model, Real> {
  check = (m: Readonly<Model>) => m.validSteps.includes(m.current.stepId++);
  run = (m: Model, r: Real) => {
    throw 'failure';
  };
  toString = () => 'failure';
}

const seed = Date.now();
describe(`CommandsArbitrary (seed: ${seed})`, () => {
  describe('commands', () => {
    it.skip('Should print only the commands corresponding to the failure', () => {
      // Why this test?
      //
      // fc.commands is one of the rare Arbitrary relying on an internal state.
      // By generating commands along with other arbitraries, we could highlight states issues.
      // Basically shrinking will re-use the generated commands multiple times along with a shrunk array.
      //
      // First version was failing on this test with the following output:
      // Expected the only played command to be 'failure', got: -,success,failure for steps 2
      // The output for 'steps 2' should have been '-,-,failure'

      const out = fc.check(
        fc.property(
          fc.array(fc.nat(9), 0, 3),
          fc.commands([fc.constant(new FailureCommand()), fc.constant(new SuccessCommand())]),
          fc.array(fc.nat(9), 0, 3),
          (validSteps1: number[], cmds: Iterable<fc.Command<Model, Real>>, validSteps2: number[]) => {
            const setup = () => ({
              model: { current: { stepId: 0 }, validSteps: [...validSteps1, ...validSteps2] },
              real: {}
            });
            fc.modelRun(setup, cmds);
          }
        ),
        { seed: seed }
      );
      assert.ok(out.failed, 'Should have failed');
      const cmdsRepr = out.counterexample![1].toString();
      const validSteps = [...out.counterexample![0], ...out.counterexample![2]];
      assert.ok(
        /^(-,)*failure(,-)*$/.test(cmdsRepr),
        `Expected the only played command to be 'failure', got: ${cmdsRepr} for steps ${validSteps.sort().join(',')}`
      );
    });
  });
});