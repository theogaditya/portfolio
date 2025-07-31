"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  githubLink: string;
  liveDemoLink?: string;
  tags: string[];
}

export default function ProjectCard({
  title,
  description,
  image,
  githubLink,
  liveDemoLink,
  tags,
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full"
    >
      <motion.div
        animate={{
          boxShadow: isHovered
            ? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        }}
        transition={{ duration: 0.3 }}
        className="h-full overflow-hidden border border-gray-200 dark:border-gray-800 rounded-lg"
      >
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-all duration-500"
            style={{
              transform: isHovered ? "scale(1.05)" : "scale(1)",
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
            transition={{ duration: 0.3 }}
          >
            {liveDemoLink && (
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: isHovered ? 0 : 20 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  href={liveDemoLink}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-md hover:bg-gray-100 transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-xl mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10"
              >
                {tag}
              </motion.span>
            ))}
          </div>
          <div className="flex space-x-4 gap-20">
            {liveDemoLink && (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href={liveDemoLink}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-sm hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </Link>
              </motion.div>
            )}
            <motion.div whileHover={{ scale: 1.05 }}>

              <Link
                href={githubLink}
                target="_blank"
                className="inline-flex items-center gap-1 text-sm hover:underline"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}