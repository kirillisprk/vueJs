import {mount} from "@vue/test-utils";
import Calculator from "../components/Calculator";
import "regenerator-runtime/runtime"

describe("test calculator function", () => {
  const wrapper = mount(Calculator);
  const operand1 = wrapper.find("input[name=operand1]");
  const operand2 = wrapper.find("input[name=operand2]");
  const testValue1 = Math.random() * 100;
  const testValue2 = Math.random() * 100;
  operand1.setValue(testValue1);
  operand2.setValue(testValue2);
  console.log('oper1=', operand1.element.value);
  console.log('oper2=', operand2.element.value);

  test('set operand 1', () => {
    expect(wrapper.vm.$data.operand1).toBe(testValue1)
  });
  test('set operand 2', () => {
    expect(wrapper.vm.$data.operand2).toBe(testValue2)
  });
  test('add', () => {
    const operationButton = wrapper.find('button[title="+"]')
    const res = testValue1 + testValue2;
    operationButton.trigger('click');
    expect(wrapper.vm.$data.result).toBe(res);
  });
  test('sub', () => {
    const operationButton = wrapper.find('button[title="-"]')
    const res = testValue1 - testValue2;
    operationButton.trigger('click');
    expect(wrapper.vm.$data.result).toBe(res)
  });
  test('multi', () => {
    const operationButton = wrapper.find('button[title="*"]')
    const res = testValue1 * testValue2;
    operationButton.trigger('click');
    expect(wrapper.vm.$data.result).toBe(res)
  });
  test('div', () => {
    const operationButton = wrapper.find('button[title="%"]')
    const res = testValue1 / testValue2
    operationButton.trigger('click');
    expect(wrapper.vm.$data.result).toBe(res);
    expect(wrapper.vm.$data.error).toEqual('');
  });
  test('pow', () => {
    const operationButton = wrapper.find('button[title="^"]')
    const res = Math.pow(testValue1, testValue2);
    operationButton.trigger('click');
    expect(wrapper.vm.$data.result).toBe(res)
  });
  test('integerDiv', () => {
    const operationButton = wrapper.find('button[title="/"]')
    const res = (testValue1 - testValue1 % testValue2) / testValue2;
    operationButton.trigger('click');
    expect(wrapper.vm.$data.result).toBe(res);
    expect(wrapper.vm.$data.error).toEqual('');
  });
  test('div operand2=0', () => {
    const operationButton = wrapper.find('button[title="%"]');
    operand1.setValue(2);
    operand2.setValue(0);
    operationButton.trigger('click');
    expect(wrapper.vm.$data.result).toBe(0);
    expect(wrapper.vm.$data.error).toEqual('Делить на 0 нельзя!');
  });
  test('integerDiv operand2=0', () => {
    const operationButton = wrapper.find('button[title="/"]');
    operand1.setValue(2);
    operand2.setValue(0);
    operationButton.trigger('click');
    expect(wrapper.vm.$data.result).toBe(0);
    expect(wrapper.vm.$data.error).toEqual('Делить на 0 нельзя!');
  });
})

describe('test calculator display keyboard', () => {
  const wrapper = mount(Calculator);
  const operand1 = wrapper.find("input[name=operand1]");
  const operand2 = wrapper.find("input[name=operand2]");
  test('operand 1 enter 0 - 9 ', async () => {
    const selectOperand = wrapper.find("input[name=selectOperand1]");
    selectOperand.setChecked();
    const testValue = Math.floor(Math.random() * 10).toString();
    wrapper.vm.setOperand(testValue)
    expect(wrapper.vm.$data.operand1).toBe(testValue)
  });
  test('operand 2 enter 0 - 9 ', async () => {
    const selectOperand = wrapper.find("input[name=selectOperand2]");
    selectOperand.setChecked();
    const testValue = Math.floor(Math.random() * 10).toString();
    wrapper.vm.setOperand(testValue)
    expect(wrapper.vm.$data.operand2).toBe(testValue)
  });
  test('operand 1 click del ', async () => {
    const selectOperand = wrapper.find("input[name=selectOperand1]");
    selectOperand.setChecked();
    operand1.setValue('');
    const testValue = Math.floor(Math.random() * 10).toString();
    wrapper.vm.setOperand(testValue);
    expect(wrapper.vm.$data.operand1).toBe(testValue);
    wrapper.vm.setOperand('del');
    expect(wrapper.vm.$data.operand1).toBe('');

  });
  test('operand 2 click del ', async () => {
    const selectOperand = wrapper.find("input[name=selectOperand2]");
    selectOperand.setChecked();
    operand2.setValue('');
    const testValue = Math.floor(Math.random() * 10).toString();
    wrapper.vm.setOperand(testValue);
    expect(wrapper.vm.$data.operand2).toBe(testValue);
    wrapper.vm.setOperand('del');
    expect(wrapper.vm.$data.operand2).toBe('');

  });

})
