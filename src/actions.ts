/*'use server';

import { auth } from "@/auth";
import { parseServerActionResponce } from "../lib/utils";
import slugify from "slugify";
import { writeClient } from "@/src/sanity/lib/write-client";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "./sanity/lib/queries";
import { stdout } from "process";


export const createPitch = async (
    state: any,
    form: FormData,
    pitch: string,
) => {
    const session = await auth();


    const title = form.get('title') as string;
    const description = form.get('description') as string;
    const category = form.get('category') as string;
    const image = form.get('image') as string;

    const slug = slugify(title as string, { lower: true, strict: true})

    try {
        const startup = {
            title,
            description,
            category,
            image,
            slug: {
                _type: 'slug',
                current: slug,
            },
            author: {
                _type: 'reference',
                _ref: session.id
            },
            pitch,
        };

        const result = await writeClient.create({ _type: 'startup', ...startup})

        return parseServerActionResponce({
            ...result,
            error: '',
            status: 'SUCCESS',
        });
    } catch (error) {
        console.error(error);

        return parseServerActionResponce({
            error: JSON.stringify(error),
            status: 'ERROR',
        })
    }
};*/


"use server";

import { auth } from "@/auth";
import { parseServerActionResponce } from "@/lib/utils";
import slugify from "slugify";
import { writeClient } from "./sanity/lib/write-client";


export const createPitch = async (
  state: any,
  form: FormData,
  pitch: string,
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponce({
      error: "Not signed in",
      status: "ERROR",
    });

  const { title, description, category, image } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch"),
  );

  const slug = slugify(title as string, { lower: true, strict: true });

  try {
    const startup = {
      title,
      description,
      category,
      image,
      slug: {
        _type: slug,
        current: slug,
      },
      author: {
        _type: "reference",
        _ref: session?.id,
      },
      pitch,
    };

    const result = await writeClient.create({ _type: "startup", ...startup });

    return parseServerActionResponce({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    console.log(error);

    return parseServerActionResponce({
      error: JSON.stringify(error),
      status: "ERROR",
    });
  }
};