import { Expense } from '../../../models/Expense';
import expenseService from '../../../services/expenseService';
import {Controller} from '../http';

interface QueryCtrlProps {
  expenseService: typeof expenseService
}

export class QueryCtrl extends Controller<QueryCtrlProps> {
  constructor(services: QueryCtrlProps) {
    super(services)
  }
  async run(options: any) {
    const limit = parseInt(options.limit || '20', 10)
    const offset = parseInt(options.offset || '0', 10)

    const {expenseService} = this.services
    return await expenseService.query(limit, offset)
  }
}

interface ShowCtrlProps {
  expenseService: typeof expenseService
}

export class ShowCtrl extends Controller<ShowCtrlProps> {
  constructor(props: ShowCtrlProps) {
    super(props);
  }
  async run(options: any) {
    const {expenseService} = this.services;
    const id = parseInt(options.id || '0', 10);
    const expense: Expense | null = await expenseService.show(id)
    if (!expense) throw {status: 404}
    return expense
  }
}

interface CreateCtrlProps {
  expenseService: typeof expenseService
}

export class CreateCtrl extends Controller<CreateCtrlProps> {
  constructor(props: CreateCtrlProps) {
    super(props)
  }
  async run(options: any) {
    const { text } = options
    const amount = parseInt(options.amount, 10)

    if (!text || isNaN(amount)) {
      throw {status: 400}
    }
    const { expenseService } = this.services
    const expense = await expenseService.create(amount, text, Date.now(), 1);
    return expense
  }
}

interface UpdateCtrlProps {
  expenseService: typeof expenseService
}

export class UpdateCtrl extends Controller<UpdateCtrlProps> {
  constructor(props: UpdateCtrlProps) {
    super(props)
  }
  async run(options: any) {
    const { id } = options
    if(!id) throw {status: 404}
    const { amount, text, date } = options
    const {expenseService} = this.services
    const expense = await expenseService.update(id, amount, text, date)
    return expense
  }
}

interface DestroyCtrlProps {
  expenseService: typeof expenseService
}

export class DestroyCtrl extends Controller<DestroyCtrlProps> {
  constructor(props: DestroyCtrlProps) {
    super(props)
  }
  async run(options: any) {
    const { id } = options
    if(!id) throw {status: 404}

    const {expenseService} = this.services
    await expenseService.destroy(id)
    return {status: 204}
  }
}
