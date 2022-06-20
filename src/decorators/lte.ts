import {ClassConstructor} from 'class-transformer'
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator'

export const LTE = <T>(type: ClassConstructor<T>, property: string, validationOptions?: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: LTEConstraint,
    })
  }
}

@ValidatorConstraint({name: 'LTE'})
export class LTEConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [property] = args.constraints
    return value <= args.object[property]
  }

  defaultMessage(args: ValidationArguments) {
    const [constraintProperty]: string[] = args.constraints
    return `${args.property} must be lower than or equal to ${constraintProperty}`
  }
}
