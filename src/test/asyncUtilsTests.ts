import { suite, test, expect } from "../main/index"
import { isPromise } from "../main/asyncUtils"

@suite
export class AsyncUtilsTests {
    @test
    public isPromiseFunctionOnRegularFunctionShouldReturnFalse(): void {
        // Arrange
        const regularFunction = (): string => "hello world"

        // Act
        const result = isPromise(regularFunction())

        // Assert
        expect(result).to.be.false
    }

    @test
    public isPromiseFunctionOnPromiseShouldReturnTrue(): void {
        // Arrange
        const regularFunction = async (): Promise<string> => Promise.resolve("hello world")

        // Act
        const result = isPromise(regularFunction())

        // Assert
        expect(result).to.be.true
    }
}
