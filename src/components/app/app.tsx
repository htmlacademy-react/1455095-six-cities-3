import Main from '../../pages/main/main';

type AppScreenProps = {
  count: number;
};

function App({ count }: AppScreenProps): JSX.Element {
  return <Main count={count} />;
}
export default App;
