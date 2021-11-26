const formats = [
  "bold",
  "italic",
  "underline",
  "strike",
  "list",
  "script",
  "indent",
  "direction",
  "size",
  "header",
  "color",
  "background",
  "font",
  "align",
  "link",
];

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"],
  [{ size: ["small", false, "large", "huge"] }],
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["link"],
  [{ color: [] }, { background: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["clean"],
];

const modules = {
  toolbar: toolbarOptions,
};

export { formats, modules };
