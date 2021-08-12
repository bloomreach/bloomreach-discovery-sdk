export class DomUtils {
  private static updateUrl(urlParameters: URLSearchParams) {
    const historyStateObject: {[key: string]: string} = {}
    for (const pair of urlParameters.entries()) {
      historyStateObject[pair[0]] = pair[1]
    }
    window.history.pushState(
      historyStateObject,
      document.title,
      `?${urlParameters.toString()}`
    )
  }

  static updateMultipleInstanceParametersInUrl(
    parameterName: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parameters: {[key: string]: any} | Array<any>,
    userOptions?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      valueSerializer?: (parameterValue: any) => string
      nameValueSeparator?: string
    }
  ): void {
    const defaultOptions = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      valueSerializer: (parameterValue: any) => parameterValue.toString(),
      nameValueSeparator: ':'
    }
    const options = {
      ...defaultOptions,
      ...userOptions
    }
    const urlParameters = new URLSearchParams(window.location.search)
    urlParameters.delete(parameterName)

    if (Array.isArray(parameters)) {
      parameters.forEach((value) => {
        urlParameters.append(parameterName, options.valueSerializer(value))
      })
    } else {
      Object.keys(parameters).forEach((key) => {
        urlParameters.append(
          parameterName,
          `${key}${options.nameValueSeparator}${options.valueSerializer(
            parameters[key]
          )}`
        )
      })
    }

    DomUtils.updateUrl(urlParameters)
  }

  static updateParameterInUrl(
    parameterName: string,
    newValue: string | ((value: string) => string)
  ): void {
    const urlParameters = new URLSearchParams(window.location.search)
    if (typeof newValue === 'function') {
      urlParameters.set(
        parameterName,
        newValue(urlParameters.get(parameterName) as string)
      )
    } else {
      if (newValue === '') {
        urlParameters.delete(parameterName)
      } else {
        urlParameters.set(parameterName, newValue)
      }
    }

    DomUtils.updateUrl(urlParameters)
  }

  static incrementParameterInUrl(parameterName: string): void {
    DomUtils.updateParameterInUrl(parameterName, (oldValue) => {
      if (!oldValue) return '2'
      let newValue = Number.parseInt(oldValue as string)
      return (++newValue).toString()
    })
  }

  static decrementParameterInUrl(parameterName: string): void {
    DomUtils.updateParameterInUrl(parameterName, (oldValue) => {
      if (!oldValue) return '1'
      let newValue = Number.parseInt(oldValue as string)
      return (--newValue).toString()
    })
  }

  static findUpElementWithClassName(
    startElement: Node,
    className: string
  ): Node | null {
    let element: Node | null = startElement
    while (element && element.parentNode) {
      element = element.parentNode
      if (element && (element as HTMLElement).classList?.contains(className)) {
        return element
      }
    }
    return null
  }

  static findUpElementByTagName(
    startElement: Node,
    tagName: string
  ): Node | null {
    let element: Node | null = startElement
    while (element && element.parentNode) {
      element = element.parentNode
      if (
        element &&
        (element as HTMLElement).tagName.toLowerCase() === tagName.toLowerCase()
      ) {
        return element
      }
    }
    return null
  }
}
