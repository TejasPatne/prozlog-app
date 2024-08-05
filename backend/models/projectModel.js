import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 10,
      max: 150,
    },
    domain: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    video: {
      type: String,
    },
    github: {
      type: String,
    },
    mentors: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
        },
      ],
      maxLength: 2,
      required: true,
    },
    team: {
      type: [
        {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
      ],
      maxLength: 4,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
