import { errorCheck } from "../../utils/manejoDeErrores.js";
import { toPOJO } from "../../utils/utils.js";

export class CartsDaoMongoose {
  constructor(cartsModel) {
    this.cartModel = cartsModel;
  }

  async readMany() {
    const carts = await this.cartModel.find().lean();
    return toPOJO(carts);
  }

  async readOne(id) {
    const cart = await this.cartModel.findById(id).lean();
    return toPOJO(cart);
  }

  async createOne() {
    const cart = await this.cartModel.create({});
    return toPOJO(cart);
  }

  async updateOne(cartId, bebidaId, quantity) {
    try {
      if (!cartId || !bebidaId || !quantity || isNaN(quantity)) {
        const error = new Error(
          "DATA type tipo numero requerido."
        );
        error.code = errorCheck.INCORRECT_DATA;
        throw error;
      }

      const cart = await this.cartModel.findById(cartId);

      if (!cart) {
        const error = new Error("Carrito no encontrado");
        error.code = errorCheck.NOT_FOUND;
        throw error;
      }

      const existingBebida = cart.bebidas.find(
        (bebida) => bebida._id === bebidaId
      );

      if (existingBebida) {
        existingBebida.quantity += parseInt(quantity);
        if (existingBebida.quantity <= 0) {
          cart.bebidas = cart.bebidas.filter(
            (bebida) => bebida._id !== bebidaId
          );
        }
      } else {
        if (parseInt(quantity) > 0) {
          cart.bebidas.push({ _id: bebidaId, quantity: parseInt(quantity) });
        }
      }

      await cart.save();

      if (cart.bebidas.length === 0) {
        return { _id: cart._id, bebidas: [] };
      }

      return cart;
    } catch (error) {
      throw error;
    }
  }

  async deleteOne(id) {
    const cart = await this.cartModel.findByIdAndDelete(id).lean();
    return toPOJO(cart);
  }

  async deleteBebidaFromCart(cartId, bebidaId) {
    try {
      if (!cartId || !bebidaId) {
        const error = new Error("IDs requeridos!");
        error.code = errorCheck.INCORRECT_DATA;
        throw error;
      }

      const cart = await this.cartModel.findById(cartId);

      if (!cart) {
        const error = new Error("Carrito no encontrado");
        error.code = errorCheck.NOT_FOUND;
        throw error;
      }

      cart.bebidas = cart.bebidas.filter(
        (bebida) => bebida._id !== bebidaId
      );

      await cart.save();

      return cart;
    } catch (error) {
      console.error("Delete from DB error: ", error);
      throw new Error(
        `Error al eliminar la bebida del carrito: ${error.message}`
      );
    }
  }

  async deleteBebidasFromCart(cartId) {
    try {
      if (!cartId) {
        const error = new Error("Se requiere un ID para borrar el Cart");
        error.code = errorCheck.INCORRECT_DATA;
        throw error;
      }

      const cart = await this.cartModel.findById(cartId);

      if (!cart) {
        const error = new Error("Carrito no encontrado");
        error.code = errorCheck.NOT_FOUND;
        throw error;
      }

      cart.bebidas = [];

      await cart.save();

      return cart;
    } catch (error) {
      throw new Error(
        `Error al eliminar bebidas del carrito: ${error.message}`
      );
    }
  }
}
