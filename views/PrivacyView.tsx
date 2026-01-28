
import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Database, Trash2, FileText } from 'lucide-react';
import { Button } from '../components/Button';

interface Props {
  onBack: () => void;
}

export const PrivacyView: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-black relative p-6 pb-24 animate-fade-in">
      <div className="flex items-center gap-4 mb-8 pt-2">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-white tracking-tight">Privacidade e Termos</h1>
      </div>

      <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
        
        <div className="bg-dark-gray p-5 rounded-2xl border border-white/5 shadow-inner">
            <p className="mb-2 text-[10px] text-neon font-black uppercase tracking-widest">Padrão de Transparência Play Store</p>
            <p className="text-xs">
                O FitScan Brasil (FitScan AI) opera sob as diretrizes da LGPD e as políticas de segurança de dados do Google. Seus dados são protegidos por criptografia de ponta a ponta.
            </p>
        </div>

        <section className="space-y-3">
            <h3 className="text-white font-bold text-md flex items-center gap-2">
                <FileText className="text-neon w-4 h-4" /> Isenção de Responsabilidade
            </h3>
            <p className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl text-yellow-200/80 text-xs italic">
                O FitScan é uma ferramenta de auxílio baseada em IA. As informações geradas não constituem conselho médico. Sempre consulte um médico ou profissional de educação física antes de iniciar qualquer atividade física intensa.
            </p>
        </section>

        <section className="space-y-2">
            <h3 className="text-white font-bold flex items-center gap-2">
                <Eye className="text-neon w-4 h-4" /> Processamento de Imagem
            </h3>
            <p className="text-gray-400">
                O acesso à câmera é temporário. As fotos enviadas para identificação de máquinas são processadas pela API do Google Gemini. Não armazenamos o rosto do usuário ou o ambiente da academia de forma identificável após o processamento da IA.
            </p>
        </section>

        <section className="space-y-2">
            <h3 className="text-white font-bold flex items-center gap-2">
                <Database className="text-blue-400 w-4 h-4" /> Compartilhamento com Terceiros
            </h3>
            <p className="text-gray-400">
                Seus dados (peso, idade, objetivo) são compartilhados com a Google AI para a geração de treinos. Não vendemos seus dados para anunciantes.
            </p>
        </section>

        <section className="bg-red-900/10 border border-red-500/20 p-5 rounded-2xl space-y-3">
            <h3 className="text-red-400 font-bold flex items-center gap-2">
                <Trash2 className="w-4 h-4" /> Direito de Exclusão
            </h3>
            <p className="text-xs text-red-200/60">
                Você pode solicitar a exclusão total da sua conta e dados de uso a qualquer momento.
            </p>
            <button 
              onClick={() => alert('Para excluir sua conta, envie um email para suporte@fitscanbrasil.com com o assunto "EXCLUSÃO DE DADOS". Seus dados serão removidos em até 24 horas.')}
              className="text-red-400 text-xs font-bold underline"
            >
              Solicitar exclusão agora
            </button>
        </section>

        <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-gray-500 text-[10px] mb-6 uppercase tracking-widest">
                FitScan Brasil • Todos os direitos reservados
            </p>
            <Button onClick={onBack} variant="primary" fullWidth>
                Concordo com os Termos
            </Button>
        </div>
      </div>
    </div>
  );
};
