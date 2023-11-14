import { encode } from "gpt-tokenizer";

export function produceLogitBias({
  tokensIncrease,
  tokensDecrease,
  amount = 100,
}) {
  const logitBias = {};
  if (Array.isArray(tokensIncrease) && tokensIncrease.length > 0) {
    tokensIncrease.forEach((text) => {
      encode(text).map((token) => {
        logitBias[token] = amount;
      });
    });
  }
  if (Array.isArray(tokensDecrease) && tokensDecrease.length > 0) {
    tokensDecrease.forEach((text) => {
      encode(text).map((token) => {
        logitBias[token] = -amount;
      });
    });
  }
  return logitBias;
}
