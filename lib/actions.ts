"use server";

import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createProduct } from "@/lib/products";
import { createNotice } from "@/lib/Notices";

const MAX_IMAGE_SIZE = 4 * 1024 * 1024;

const IMAGE_TYPES = {
  "image/jpeg": {
    extension: "jpg",
    matches: (bytes: Uint8Array) =>
      bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff,
  },
  "image/png": {
    extension: "png",
    matches: (bytes: Uint8Array) =>
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      bytes[4] === 0x0d &&
      bytes[5] === 0x0a &&
      bytes[6] === 0x1a &&
      bytes[7] === 0x0a,
  },
  "image/gif": {
    extension: "gif",
    matches: (bytes: Uint8Array) =>
      bytes[0] === 0x47 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x38 &&
      (bytes[4] === 0x37 || bytes[4] === 0x39) &&
      bytes[5] === 0x61,
  },
  "image/webp": {
    extension: "webp",
    matches: (bytes: Uint8Array) =>
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46 &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50,
  },
} satisfies Record<
  string,
  { extension: string; matches: (bytes: Uint8Array) => boolean }
>;

export async function createProductAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const image = formData.get("image");

  if (!title || !author || !content) {
    // 실습 단계의 아주 단순한 검증입니다.
    // 실제 서비스라면 에러 상태를 돌려주고 폼에 메시지를 보여줘야 합니다.
    throw new Error("제목, 작성자, 내용을 모두 입력해주세요.");
  }

  if (image !== null && !(image instanceof File)) {
    throw new Error("사진 파일을 확인할 수 없습니다.");
  }

  let imageUrl: string | undefined;
  if (image instanceof File && image.size > 0) {
    if (image.size > MAX_IMAGE_SIZE) {
      throw new Error("사진 파일은 4MB 이하만 등록할 수 있습니다.");
    }

    const imageType = IMAGE_TYPES[image.type as keyof typeof IMAGE_TYPES];
    if (!imageType) {
      throw new Error("JPG, PNG, GIF, WEBP 사진만 등록할 수 있습니다.");
    }

    const imageBuffer = Buffer.from(await image.arrayBuffer());
    if (!imageType.matches(imageBuffer)) {
      throw new Error("파일 형식과 실제 사진 데이터가 일치하지 않습니다.");
    }

    const uploadDirectory = path.join(process.cwd(), "public", "uploads");
    const fileName = `${randomUUID()}.${imageType.extension}`;
    await mkdir(uploadDirectory, { recursive: true });
    await writeFile(path.join(uploadDirectory, fileName), imageBuffer, {
      flag: "wx",
    });
    imageUrl = `/uploads/${fileName}`;
  }

  const product = await createProduct({
    title,
    author,
    content,
    ...(imageUrl ? { imageUrl } : {}),
  });
  revalidatePath("/products");
  redirect(`/products/${product.id}`);
}

export async function createNoticeAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();

  if (!title || !author || !content) {
    // 실습 단계의 아주 단순한 검증입니다.
    // 실제 서비스라면 에러 상태를 돌려주고 폼에 메시지를 보여줘야 합니다.
    throw new Error("제목, 작성자, 내용을 모두 입력해주세요.");
  }

  const notice = await createNotice({ title, author, content });
  revalidatePath("/notice");
  revalidatePath("/");
  redirect(`/notice/${notice.id}`);
}
