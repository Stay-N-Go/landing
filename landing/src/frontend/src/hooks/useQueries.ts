import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitLead() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      propertyName: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const fullMessage = data.propertyName
        ? `Property: ${data.propertyName}\n${data.message}`
        : data.message;
      await actor.submitLead(data.name, data.email, data.phone, fullMessage);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}
