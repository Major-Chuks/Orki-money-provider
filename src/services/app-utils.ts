export const getInitial = ({
  firstName,
  lastName,
}: {
  firstName?: string;
  lastName?: string;
}): string => {
  if (!firstName && !lastName) return "";
  const initials = [firstName, lastName].map((word) =>
    word ? word.charAt(0) : ""
  );
  return initials.join("").toUpperCase();
};
