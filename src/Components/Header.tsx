/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';

type Props = {
  userId: number;
  onSubmit: (todo: Todo) => Promise<void>,
  selectedTodo: Todo | null,
  statusTodo: string
};

export const Header: React.FC<Props> = ({
  onSubmit,
  userId,
  selectedTodo,
  statusTodo,
}) => {
  const [title, setTitle] = useState('');
  const [isSubmitted, setIsSabmitted] = useState(false);

  const myInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    myInputRef.current?.focus();
  }, []);

  const reset = () => {
    setTitle('');
  };

  const handleSubmit = (event:React.FormEvent) => {
    event.preventDefault();

    setIsSabmitted(true);

    onSubmit({
      title: title.trim(),
      completed: false,
      userId,
      id: selectedTodo?.id || 0,
    })
      .then(reset)
      .finally(() => {
        setIsSabmitted(false);
      });
  };

  return (

    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: statusTodo === 'Completed',
        })}
        data-cy="ToggleAllButton"
      />
      {/* Add a todo on form submit */}
      <form
        onSubmit={handleSubmit}
        onReset={reset}
      >
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          ref={myInputRef}
          value={title}
          onChange={(event) => setTitle(event.currentTarget.value)}
          disabled={isSubmitted}
        />
      </form>
    </header>
  );
};