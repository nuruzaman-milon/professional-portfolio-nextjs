"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ExperienceForm, {
  type ExperienceFormData,
} from "@/components/admin/ExperienceForm";

export default function EditExperiencePage() {
  const { id } = useParams<{ id: string }>();
  const [experience, setExperience] = useState<ExperienceFormData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/experiences/${id}`).then(async (res) => {
      if (res.ok) setExperience(await res.json());
      else setError("Experience not found.");
    });
  }, [id]);

  return (
    <div>
      <h1 className="pf-serif text-3xl md:text-4xl font-normal text-gray-900 dark:text-white mb-8">
        Edit experience
      </h1>
      {error ? (
        <p className="text-sm text-red-500">{error}</p>
      ) : experience ? (
        <ExperienceForm initial={experience} />
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading…</p>
      )}
    </div>
  );
}
