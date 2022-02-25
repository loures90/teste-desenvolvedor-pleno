import { DeleteResponseModel } from '../../../domain/usecases/delete-response'
import { DeleteResponseRepository } from '../../protocols/delete-response-repository'
import { GetQuestionRepository } from '../../protocols/get-question-repository'
import { DbDeleteResponse } from './db-delete-response'

describe('DBDeleteResponse', () => {
  const makeFakeResponse = (): DeleteResponseModel => ({
    question_id: 'valid_id',
    response: 'old_response'
  })

  interface Sut {
    sut: DbDeleteResponse
    deleteResponseRepositoryStub: DeleteResponseRepository
    getQuestionRepositoryStub: GetQuestionRepository
  }

  const makeSut = (): Sut => {
    const deleteResponseRepositoryStub = makeDeleteResponseRepositoryStub()
    const getQuestionRepositoryStub = makeGetQuestionRepositoryStub()
    const sut = new DbDeleteResponse(deleteResponseRepositoryStub, getQuestionRepositoryStub)
    return {
      sut,
      deleteResponseRepositoryStub,
      getQuestionRepositoryStub
    }
  }

  const makeDeleteResponseRepositoryStub = (): DeleteResponseRepository => {
    class DeleteResponseRepositoryStub implements DeleteResponseRepository {
      async deleteResponse (Response: DeleteResponseModel): Promise<Boolean> {
        return await new Promise(resolve => resolve(true))
      }
    }
    return new DeleteResponseRepositoryStub()
  }

  const makeGetQuestionRepositoryStub = (): GetQuestionRepository => {
    class GetQuestionRepositoryStub implements GetQuestionRepository {
      async get (id: string): Promise<any> {
        const fakeResponse = {
          id: 'valid_id',
          question: 'valid_question',
          responses: ['old_response']
        }
        return await new Promise(resolve => resolve(fakeResponse))
      }
    }
    return new GetQuestionRepositoryStub()
  }

  test('Should call DeleteResponseRepository', async () => {
    const { sut, deleteResponseRepositoryStub } = makeSut()
    const DeleteSpy = jest.spyOn(deleteResponseRepositoryStub, 'deleteResponse')
    const Response = makeFakeResponse()
    await sut.delete(Response)
    expect(DeleteSpy).toHaveBeenLastCalledWith(Response)
  })

  test('Should return true on success', async () => {
    const { sut } = makeSut()
    const response = makeFakeResponse()
    const result = await sut.delete(response)
    expect(result).toEqual(true)
  })
})