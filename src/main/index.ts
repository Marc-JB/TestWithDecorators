import chai from "chai"
import chaiAsPromised from "chai-as-promised"
import * as mocha from "mocha"
import { wrapInPromise } from "./asyncUtils"
import { convertFunctionNameToText } from "../main/textUtils"

chai.use(chaiAsPromised)

interface NonInitialisedSuite {}

type TestOnlySuite = Required<PreTestOnlySuite>

type TestFunction = (instance: Class) => mocha.Test

interface PreTestOnlySuite {
    tests?: Set<TestFunction>
}

type Suite = Required<PreSuite>

interface PreSuite {
    suite?: mocha.Suite
    instance?: Class
}

type ConstructorType<R = {}> = new (...args: any[]) => R

type Class = { [key: string]: (...args: any[]) => void | Promise<void> }

type ClassConstructor = ConstructorType<Class>

type AnySuite = (NonInitialisedSuite | TestOnlySuite | Suite) & ClassConstructor

function getSuite(constructor: Function): AnySuite {
    return constructor as unknown as AnySuite
}

function addTestToSuite(test: TestFunction, suite: AnySuite): void {
    if ("suite" in suite) {
        suite.suite.addTest(test(suite.instance))
        return
    } else if (!("tests" in suite)) {
        (suite as PreTestOnlySuite).tests = (suite as PreTestOnlySuite).tests ?? new Set()
    }

    (suite as TestOnlySuite).tests.add(test)
}

function initSuite(suite: AnySuite, customName: string | null = null): Suite {
    let tests: Set<TestFunction> = new Set()

    if ("suite" in suite) {
        return suite
    } else if ("tests" in suite) {
        tests = suite.tests
        delete suite.tests
    }

    const name = customName ?? convertFunctionNameToText(suite.name)
    const mochaSuite = mocha.describe(name, () => {})
    const instance = new suite(mochaSuite);

    (suite as PreSuite).suite = mochaSuite;
    (suite as PreSuite).instance = instance

    const s = suite as Suite & ClassConstructor

    for (const test of tests)
        s.suite.addTest(test(s.instance))

    return s
}

function initSuiteByConstructor<T extends Function>(constructor: T, customName: string | null = null): Suite {
    return initSuite(getSuite(constructor), customName)
}

function initTest(target: Object, propertyKey: string | symbol, customName: string | null = null): void {
    const key = typeof propertyKey === "string" ? propertyKey : propertyKey.toString()
    const name = customName ?? convertFunctionNameToText(key)
    addTestToSuite((instance: Class) => new mocha.Test(name, (done: mocha.Done) => {
        wrapInPromise(instance[key])().then(done, done)
    }), getSuite(target.constructor))
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Suite: ClassDecorator = <TFunction extends Function>(constructor: TFunction) => {
    initSuiteByConstructor(constructor)
    return constructor
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NamedSuite: (name: string) => ClassDecorator = (name) => {
    return <T extends Function>(constructor: T): T => {
        initSuiteByConstructor(constructor, name)
        return constructor
    }
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Test: MethodDecorator = (target, propertyKey, _) => initTest(target, propertyKey)

// eslint-disable-next-line @typescript-eslint/naming-convention
export const NamedTest: (name: string) => MethodDecorator = (name) => (target, propertyKey): void => initTest(target, propertyKey, name)

export const suite = Suite

export const namedSuite = NamedSuite

export const test = Test

export const namedTest = NamedTest

export const expect = chai.expect
