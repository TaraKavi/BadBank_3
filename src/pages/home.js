import { BankCard } from "../components/bankcard";

export function Home() {
  const setHomeText = () => <p>This is the most unsafe bank in the world. Because not everything is about the money...</p>

  return (
    <div className="card-container home">
      <BankCard
        txtcolor="black"
        header="Home"
        title="Welcome to our bank"
        text= {setHomeText()}
        body={
          <img src="/images/Subject.png" className="card-img-top" alt="..." />
        }
      />
    </div>
  );
}
