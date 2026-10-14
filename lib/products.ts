import { connectDB } from "./mongodb"
import { Product as ProductModel } from "@/models/products"

export type Product = {
  id: string
  title: string
  author: string
  content: string
  imageUrl?: string
  createdAt: string
}

type ProductDocLike = {
  _id: unknown
  title: string
  author: string
  content: string
  imageUrl?: string
  createdAt?: Date
}

function toProduct(doc: ProductDocLike): Product {
  return {
    id: String(doc._id),
    title: doc.title,
    author: doc.author,
    content: doc.content,
    ...(doc.imageUrl ? { imageUrl: doc.imageUrl } : {}),
    createdAt: doc.createdAt?.toISOString().slice(0, 10) ?? "날짜 없음",
  }
}

async function seedIfEmpty() {
  const seedProducts = [
    {
      id: "1",
      title: "오래쓴 카메라 팝니다",
      author: "aaa",
      content: "네고 불가",
      imageUrl:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=960&q=80",
      createdAt: "2026-09-22",
    },
    {
      id: "2",
      title: "오래된 자전거 팝니다",
      author: "bbb",
      content: "상태 좋습니다.",
      imageUrl:
        "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=960&q=80",
      createdAt: "2026-09-22",
    },
  ]
  const count = await ProductModel.countDocuments()
  if (count === 0) {
    await ProductModel.insertMany(seedProducts)
    return
  }

  await Promise.all(
    seedProducts.map(({ title, author, content, imageUrl }) =>
      ProductModel.updateOne(
        { title, author, content, imageUrl: { $in: [null, ""] } },
        { $set: { imageUrl } },
      ),
    ),
  )
}

export async function getProducts(): Promise<Product[]> {
  await connectDB()
  await seedIfEmpty()
  const docs = await ProductModel.find().sort({ createdAt: -1 }).lean()
  return docs.map((doc) => toProduct(doc as ProductDocLike))
}

export async function getProduct(id: string): Promise<Product | undefined> {
  await connectDB()
  try {
    const doc = await ProductModel.findById(id).lean()
    return doc ? toProduct(doc as ProductDocLike) : undefined
  } catch {
    return undefined
  }
}

export async function createProduct(input: {
  title: string
  author: string
  content: string
  imageUrl?: string
}): Promise<Product> {
  await connectDB()
  const doc = await ProductModel.create(input)
  return toProduct(doc)
}

export async function updateProduct(
  id: string,
  input: {
    title: string
    author: string
    content: string
    imageUrl?: string
  },
): Promise<Product | undefined> {
  await connectDB()

  try {
    const doc = await ProductModel.findByIdAndUpdate(
      id,
      { $set: input },
      { new: true, runValidators: true },
    ).lean()

    return doc ? toProduct(doc as ProductDocLike) : undefined
  } catch {
    return undefined
  }
}

export async function deleteProduct(id: string): Promise<boolean> {
  await connectDB()

  try {
    const doc = await ProductModel.findByIdAndDelete(id).lean()
    return Boolean(doc)
  } catch {
    return false
  }
}
