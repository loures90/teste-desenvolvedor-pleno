import { ok, serverError } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse, ListResponses } from './list-responses-protocols'

export class ListResponsesController implements Controller {
  private readonly listResponses: ListResponses

  constructor (listResponses: ListResponses) {
    this.listResponses = listResponses
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.params.id
      await this.listResponses.list(id)
      return ok(true)
    } catch (error) {
      return serverError(error)
    }
  }
}