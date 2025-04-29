import { useMutation } from "@tanstack/react-query";
import { saveTypingInfo } from ".";
import { SaveTyping } from "../model/typing";

const useSaveTypingInfo = () => {
  return useMutation({
    mutationFn: (payload: SaveTyping["Request"]["body"]) =>
      saveTypingInfo(payload),
    onSuccess: () => {},
  });
};

export default useSaveTypingInfo;
