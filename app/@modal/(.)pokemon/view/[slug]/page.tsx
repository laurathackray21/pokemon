import { Modal } from "@/app/_components/Modal";
import { PokemonDetail } from "@/app/_components/PokemonDetail";

interface PokemonModalProps {
  params: {
    slug: string;
  };
}

export default function PokemonModal(props: PokemonModalProps) {
  return (
    <Modal>
      <PokemonDetail name={props.params.slug}></PokemonDetail>
    </Modal>
  );
}
