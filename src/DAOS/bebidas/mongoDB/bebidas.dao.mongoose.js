import { toPOJO } from '../../utils/utils.js'

export class BebidasDaoMongoose {
  constructor(bebidasModel) {
    this.bebidasModel = bebidasModel
  }

  async create(data) {
    const bebida = await this.bebidasModel.create(data)
    return toPOJO(bebida)
  }

  async readOne(query) {
    const bebida = await this.bebidasModel.findOne(query).lean()
    return toPOJO(bebida)
  }

  async readMany(query) {
    return toPOJO(await this.bebidasModel.find(query).lean())
  }


  async updateOne(query, data) {
    throw new Error('NOT IMPLEMENTED')
  }

  async updateMany(query, data) {
    throw new Error('NOT IMPLEMENTED')
  }

  async deleteOne(query) {
    throw new Error('NOT IMPLEMENTED')
  }

  async deleteMany(query) {
    throw new Error('NOT IMPLEMENTED')
  }
}

let bebidasDaoMongoose
console.log('Usando persistencia en mongodb')

export async function getDaoMongoose() {
  if (!bebidasDaoMongoose) {
    await connect(MONGODB_CNX_STR)
    console.log('conectado a mongodb')
    bebidasDaoMongoose = new bebidasDaoMongoose()
  }
  return bebidasDaoMongoose
}