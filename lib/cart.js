import { Store } from './store'

export const Cart = {
  items() {
    return Store.get("dittomart_cart", [])
  },
  save(items) {
    Store.set("dittomart_cart", items)
  },
  count() {
    return this.items().reduce((s, i) => s + i.qty, 0)
  },
  subtotal() {
    return this.items().reduce((s, i) => s + i.price * i.qty, 0)
  },
  add(id, variantLabel = null, qty = 1, getProduct, PRODUCTS) {
    const p = getProduct(id)
    if (!p) return

    const variant = variantLabel
      ? p.variants.find((v) => v.label === variantLabel)
      : p.variants[
          Math.min(1, p.variants.length - 1) === 1 && p.variants.length > 1
            ? p.variants.findIndex((v) => v.price === p.price)
            : 0
        ] || p.variants[0]

    const useVar = variant || { label: p.unit, price: p.price }
    const key = p.id + "::" + useVar.label
    const items = this.items()
    const found = items.find((i) => i.key === key)

    if (found) {
      found.qty += qty
    } else {
      items.push({
        key,
        id: p.id,
        name: p.name,
        price: useVar.price,
        variant: useVar.label,
        qty,
        img: p.img,
      })
    }

    this.save(items)
  },

  remove(key) {
    const items = this.items().filter((i) => i.key !== key)
    this.save(items)
  },

  updateQty(key, qty) {
    const items = this.items()
    const found = items.find((i) => i.key === key)
    if (found) {
      found.qty = Math.max(0, qty)
      if (found.qty === 0) this.remove(key)
      else this.save(items)
    }
  },

  clear() {
    Store.set("dittomart_cart", [])
  },
}
