import { render, screen, fireEvent } from '@testing-library/react';
import TopMenu from './TopMenu';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../slices/authSlice';
import { vi } from 'vitest';

// Створюємо тестовий стор
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

// Мок для react-redux
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useSelector: vi.fn(),
    useDispatch: vi.fn(),
  };
});

import * as reactRedux from 'react-redux'; // Імпорт після мокання

const renderComponent = (sessionCount = 1) => {
  render(
    <Provider store={store}>
      <TopMenu sessionCount={sessionCount} />
    </Provider>
  );
};

describe('TopMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('рендериться без помилок', () => {
    (reactRedux.useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ auth: { user: null } })
    );
    renderComponent();
    expect(screen.getByText(/Active sessions:/)).toBeInTheDocument();
  });

  test('відображає правильну кількість сесій', () => {
    (reactRedux.useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ auth: { user: null } })
    );
    renderComponent(5);
    expect(screen.getByText(/Active sessions: 5/)).toBeInTheDocument();
  });

  test('показує кнопку Logout, якщо є користувач', () => {
    (reactRedux.useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ auth: { user: 'John' } })
    );
    renderComponent();
    expect(screen.getByText(/Welcome,/)).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText(/Logout/)).toBeInTheDocument();
  });

  test('кнопка Logout викликає dispatch', () => {
    (reactRedux.useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ auth: { user: 'John' } })
    );
    const dispatchMock = vi.fn();
    (reactRedux.useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);

    renderComponent();

    fireEvent.click(screen.getByText(/Logout/));
    expect(dispatchMock).toHaveBeenCalledTimes(1);
  });

  test('якщо користувача немає, показує "Please login"', () => {
    (reactRedux.useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ auth: { user: null } })
    );
    renderComponent();
    expect(screen.getByText(/Please login/)).toBeInTheDocument();
  });
});
