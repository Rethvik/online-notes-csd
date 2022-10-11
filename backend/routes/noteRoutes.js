const express = require("express");
const {
  getNotes,
  createNotes,
  getNoteById,
  updateNotes,
  deleteNote,
} = require("../controllers/notesController");
const protect = require("../middleware/protectMiddleware");
const router = express.Router();

router.route("/").get(protect, getNotes);
router.route("/create").post(protect, createNotes);
router.route("/:id").get(protect, getNoteById);
router.route("/:id").put(protect, updateNotes);
router.route("/:id").delete(protect, deleteNote);

module.exports = router;
