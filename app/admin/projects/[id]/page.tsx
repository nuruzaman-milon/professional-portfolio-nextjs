"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProjectForm, {
  type ProjectFormData,
} from "@/components/admin/ProjectForm";

export default function EditProjectPage() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectFormData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/projects/${id}`).then(async (res) => {
      if (res.ok) setProject(await res.json());
      else setError("Project not found.");
    });
  }, [id]);

  return (
    <div>
      <h1 className="pf-serif text-3xl md:text-4xl font-normal text-gray-900 dark:text-white mb-8">
        Edit project
      </h1>
      {error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : project ? (
        <ProjectForm initial={project} />
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>
      )}
    </div>
  );
}
