import './server_CIy0_6uW.mjs';
import { s as subscribe } from './beehiiv_D-zrTtIV.mjs';
import { d as defineAction, o as object, s as string } from './entrypoint_7hSRLVHs.mjs';

const server = {
  subscribe: defineAction({
    accept: "form",
    input: object({
      email: string().min(1, "Bitte gib deine E-Mail-Adresse ein.").email("Bitte gib eine gültige E-Mail-Adresse ein.")
    }),
    handler: async ({ email }) => {
      return await subscribe(email);
    }
  })
};

export { server };
