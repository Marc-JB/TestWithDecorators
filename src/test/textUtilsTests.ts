import { suite, test, expect } from "../main/index"
import { camelCaseToText, snakeCaseToText, convertFunctionNameToText } from "../main/textUtils"

@suite
export class TextUtilsTests {
    @test
    public camelCaseToTextShouldConvertTextCorrectly(): void {
        // Arrange
        const camelCaseText = "thisTextIsWrittenInCamelCase"
        const expectedResult = "This text is written in camel case"

        // Act
        const actualResult = camelCaseToText(camelCaseText)

        // Assert
        expect(actualResult).to.equal(expectedResult)
    }

    @test
    public camelCaseShouldConvertPascalCaseCorrectly(): void {
        // Arrange
        const pascalCaseText = "ThisTextIsWrittenInPascalCase"
        const expectedResult = "This text is written in pascal case"

        // Act
        const actualResult = camelCaseToText(pascalCaseText)

        // Assert
        expect(actualResult).to.equal(expectedResult)
    }

    @test
    public snakeCaseToTextShouldConvertTextCorrectly(): void {
        // Arrange
        const snakeCaseText = "this_text_is_written_in_snake_case"
        const expectedResult = "This text is written in snake case"

        // Act
        const actualResult = snakeCaseToText(snakeCaseText)

        // Assert
        expect(actualResult).to.equal(expectedResult)
    }

    @test
    public mixedTextConversionShouldConvertTextCorrectly(): void {
        // Arrange
        const mixedText = "helloWorld_helloSun_helloUniverse"
        const expectedResult = "Hello world hello sun hello universe"

        // Act
        const actualResult = convertFunctionNameToText(mixedText)

        // Assert
        expect(actualResult).to.equal(expectedResult)
    }
}
