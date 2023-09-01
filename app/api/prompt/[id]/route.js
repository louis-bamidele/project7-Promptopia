import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
// GET (read)

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (prompt) {
      return new Response(JSON.stringify(prompt), { status: 200 });
    } else {
      return new Response("prompt not found", { status: 404 });
    }
  } catch (error) {
    return new Response("failed to load all prompts", { status: 500 });
  }
};

// patch (update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    console.log("@@@@@@@", params.id);
    const existingPrompt = await Prompt.findById(params.id);
    if (existingPrompt) {
      existingPrompt.prompt = prompt;
      existingPrompt.tag = tag;
      console.log(existingPrompt);
      await existingPrompt.save();
      return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } else {
      return new Response("Prompt not found", { status: 404 });
    }
  } catch (error) {
    return new Response("Failed to update the prompt", { status: 500 });
  }
};
// delete (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);

    return new Response("prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
