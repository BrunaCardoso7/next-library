import { render, screen } from "@testing-library/react"
import { OnboardingForm } from "./OnboardingForm"
import { useForm } from "react-hook-form"


vi.mock("../hooks/useOnboarding", () => ({
  useOnboarding: () => {
    const form = useForm({
      defaultValues: {
        nr_cpf: "",
        nm_user: "",
        ie_role: "visitor",
      },
    })

    return {
      form,
      onSubmit: vi.fn(),
      isLoading: false,
      setRole: vi.fn(),
      setUserId: vi.fn(),
    }
  },
}))

vi.mock("../hooks/useCPFLookup", () => ({
  useCPFLookup: () => ({
    lookupByCPF: vi.fn(),
    isLoading: false,
  }),
}))

vi.mock("../hooks/useCPFAutoLookup", () => ({
  useCpfAutoLookup: () => {},
}))

describe("OnboardingForm - smoke test", () => {
  it("deve renderizar o formulário corretamente", () => {
    render(<OnboardingForm />)

    // título
    expect(screen.getByText("Visitando ou escrevendo?")).toBeInTheDocument()

    // campos principais
    expect(screen.getByPlaceholderText("000.000.000-00")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Digite aqui...")).toBeInTheDocument()

    // botão
    expect(screen.getByRole("button", { name: /avançar/i })).toBeInTheDocument()

    // tabs
    expect(screen.getByText("Visitante")).toBeInTheDocument()
    expect(screen.getByText("Escritor")).toBeInTheDocument()
  })
})