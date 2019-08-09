import {QueryCtrl, ShowCtrl, CreateCtrl, UpdateCtrl, DestroyCtrl} from './expense.ctrl'

const expenseService = {
  async query(): Promise<any> {
    return 'expensese'
  },
  async show(): Promise<any> {
    return 'a expense'
  },
  async create(): Promise<any> {
    return 'new expense'
  },
  async update() {
    return 'updated expense'
  },
  async destroy() {
    return 
  }
}

describe('Controller', () => {
  describe('Expense', () => {
    describe('QueryCtrl', () => {
      test('expenseService.query()를 호출한다', async () => {
        jest.spyOn(expenseService, 'query')
        const ctrl = new QueryCtrl({ expenseService })
        await ctrl.run({})
        expect(expenseService.query).toHaveBeenCalled()
      })
    })
    describe('ShowCtrl', () => {
      test('expneseService.show()를 호출한다', async () => {
        jest.spyOn(expenseService, 'show')
        const ctrl = new ShowCtrl({ expenseService })
        await ctrl.run({id: 1})
        expect(expenseService.show).toHaveBeenCalled()
      })
      test('id가 없을 경우 400 에러를 던진다', async () => {
        const ctrl = new ShowCtrl({ expenseService })
        expect(ctrl.run({})).rejects.toEqual({status: 400})
      })
    })
    describe('CreateCtrl', () => {
      test('expneseService.create()를 호출한다', async () => {
        jest.spyOn(expenseService, 'create')
        const ctrl = new CreateCtrl({ expenseService })
        await ctrl.run({
          text: 'text1', amount: 10, // todo negative test
        })
        expect(expenseService.create).toHaveBeenCalled()
      })
    })
    describe('UpdateCtrl', () => {
      test('expneseService.update()를 호출한다', async () => {
        jest.spyOn(expenseService, 'update')
        const ctrl = new UpdateCtrl({ expenseService })
        await ctrl.run({
          id: 1
        })
        expect(expenseService.update).toHaveBeenCalled()
      })
    })
    describe('DestroyCtrl', () => {
      test('expneseService.destroy()를 호출한다', async () => {
        jest.spyOn(expenseService, 'destroy')
        const ctrl = new DestroyCtrl({ expenseService })
        await ctrl.run({
          id: 1
        })
        expect(expenseService.destroy).toHaveBeenCalled()
      })
    })
  })
})
