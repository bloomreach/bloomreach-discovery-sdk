import {CommonConfigParameters, CommonUrlParameters} from './interfaces'

export abstract class BaseConfig<T extends CommonConfigParameters> {
  protected data: T

  constructor(data: T) {
    this.data = data
  }

  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key]
  }

  getUrlParameter = <K extends keyof CommonUrlParameters>(
    key: K
  ): CommonUrlParameters[K] => {
    return this.data.urlParameters[key]
  }

  getAll = (): T => {
    return this.data
  }

  set = (newData: T): void => {
    this.data = {
      ...this.data,
      ...newData
    }
  }

  buildQueryParameters = (): string =>
    `?${Object.keys(this.data.urlParameters)
      .reduce<string[]>(
        <K extends keyof CommonUrlParameters>(
          queryParameters: string[],
          parameterName: string
        ): string[] => [
          ...queryParameters,
          `${parameterName}=${
            ((this.data.noEncodeParameters ?? []) as Array<string>).includes(
              parameterName
            )
              ? this.getUrlParameter(parameterName as K)
              : encodeURIComponent(
                  (this.getUrlParameter(
                    parameterName as K
                  ) as unknown) as string
                )
          }`
        ],
        []
      )
      .join('&')}`
}
