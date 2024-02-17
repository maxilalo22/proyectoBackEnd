import fs from "fs/promises";
import { Order } from "../file/orders.model.files.js";


export class OrdersDaoFiles {
  constructor(path) {
    this.path = path;
  }

  async create(orderData) {
    const order = new Order(orderData)
    const orders = await this.getAllOrders();
    orders.push(order);
    await fs.writeFile(this.path, JSON.stringify(orders, null, 2));
    return order;
  }

  async getById(orderId) {
    const orders = await this.getAllOrders();
    return orders.find(order => order._id === orderId);
  }

  async getAllOrders() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async update(orderId, updatedOrderData) {
    const orders = await this.getAllOrders();
    const index = orders.findIndex(order => order._id === orderId);
    if (index === -1) {
      throw new Error("No se encontró la orden");
    }
    orders[index] = { ...orders[index], ...updatedOrderData };
    await fs.writeFile(this.path, JSON.stringify(orders, null, 2));
    return orders[index];
  }

  async delete(orderId) {
    let orders = await this.getAllOrders();
    orders = orders.filter(order => order._id !== orderId);
    await fs.writeFile(this.path, JSON.stringify(orders, null, 2));
    return true;
  }
}
