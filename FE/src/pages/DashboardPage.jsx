import BoxWindow from "../shared/BoxWindow";

export function DashboardPage() {
  return (
    <>
      <div className="max-h-full bg-dark-primary">
        <BoxWindow initialWidth={300} minWidth={200} maxWidth={600}>
          <h1>ABCD</h1>
        </BoxWindow>
      </div>
    </>
  );
}
