"use client";

import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="pf-serif text-3xl md:text-4xl font-normal text-gray-900 dark:text-white mb-8">
        New project
      </h1>
      <ProjectForm />
    </div>
  );
}
