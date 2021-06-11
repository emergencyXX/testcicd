import { render, screen } from '@testing-library/react';
import App from './App';
import AppMain from "./App";

test('renders learn react link', () => {
  render(<AppMain />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
