export default function(entry) {
  const {
    id,
    nameLabel,
    emailLabel,
    messageLabel,
    buttonLabel,
    errorMessageFormat,
    errorMessageEmpty
  } = entry.fields;
  return {
    id,
    nameLabel,
    emailLabel,
    messageLabel,
    buttonLabel,
    errorMessageFormat,
    errorMessageEmpty
  };
}
