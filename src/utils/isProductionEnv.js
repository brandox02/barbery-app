import { IS_PRODUCTION } from "@env";

export const isProductionEnv = () => Boolean(parseInt(IS_PRODUCTION));
