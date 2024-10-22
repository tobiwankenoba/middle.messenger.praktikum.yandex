import { assert, expect } from "chai";
import { Block } from "../Block";
import { stub } from "sinon";

class Dummy extends Block<StringIndexed> {
  constructor(props: StringIndexed) {
    super({ ...props });
  }

  render() {
    return "<div>Test</div>";
  }
}

const block = new Dummy({
  testProps: { key: "value" },
});

describe("Block", () => {
  it("Возвращает тэг", () => {
    assert.equal(block.element!.tagName, "DIV");
  });

  it("Возвращает контент", () => {
    assert.equal(block.element!.textContent, "Test");
  });

  it("Изменяются пропсы блока", () => {
    block.setProps({ ...block.props, id: "testId" });
    assert.deepEqual(block.props, {
      id: "testId",
      testProps: { key: "value" },
    });
  });

  it("Вызывается событие event у блока", () => {
    const testHandleEvent = stub();

    const testEvent = new MouseEvent("click");

    block.setProps({
      ...block.props,
      events: {
        click: testHandleEvent,
      },
    });

    block.element?.dispatchEvent(testEvent);

    expect(testHandleEvent.calledOnce).to.be.true;
  });
});
