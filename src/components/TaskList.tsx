import React, { useContext, useState } from "react";
import styles from "./TaskList.module.css";
import clip from "../assets/clipboard.svg";
import { FaRegCircle, FaTrash } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import { MainContext } from "../context";

interface TaskProps {
  id: number;
  desc: string;
  status: string;
}

export default function TaskList() {
  const { tasks, setTasks } = useContext(MainContext);

  const finishedTasks = tasks.filter((item: TaskProps) => item.status === "F");

  const handleDeleteTask = (id: number) => {
    const updateTasks = tasks.filter((item: TaskProps) => item.id !== id);
    setTasks(updateTasks);
  };

  const handleUpdateTaskState = (id: number) => {
    const updateTasks = tasks.map((item: TaskProps) => {
      if (item.id === id) {
        if (item.status === "C") {
          return { ...item, status: "F" };
        }

        return { ...item, status: "C" };
      } else {
        return item;
      }
    });

    setTasks(updateTasks);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <strong>Tarefas criadas</strong>
          <span>{tasks.length}</span>
        </div>
        <div>
          <strong>Concluídas</strong>
          <span>{finishedTasks.length}</span>
        </div>
      </div>

      {tasks.length > 0 ? (
        <>
          <div className={styles.taskList}>
            {tasks.map((item: TaskProps) => (
              <div className={styles.taskItem} key={item.id}>
                <span>
                  {item.status === "C" ? (
                    <FaRegCircle
                      onClick={() => handleUpdateTaskState(item.id)}
                    />
                  ) : (
                    <BsCheckCircleFill
                      color="#5e60ce"
                      onClick={() => handleUpdateTaskState(item.id)}
                    />
                  )}
                </span>
                <p
                  className={`${
                    item.status === "F" ? styles.completedTask : ""
                  }`}
                >
                  {item.desc}
                </p>
                <span onClick={() => handleDeleteTask(item.id)}>
                  <FaTrash />
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className={styles.main}>
          <div>
            <img src={clip} alt="lista" />
          </div>
          <div>
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        </div>
      )}
    </div>
  );
}
