import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Database } from 'lucide-react';
import { Button } from '../components/Button';

interface Props {
  onBack: () => void;
}

export const PrivacyView: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-black relative p-6 pb-24 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pt-2">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-400 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold text-white">Política de Privacidade</h1>
      </div>

      <div className="space-y-8 text-gray-300 text-sm leading-relaxed">
        
        <div className="bg-dark-gray p-4 rounded-xl border border-white/5">
            <p className="mb-2 text-xs text-gray-500 uppercase font-bold">Última atualização: Março 2025</p>
            <p>
                O FitScan Brasil valoriza sua privacidade. Este documento explica como tratamos seus dados ao utilizar nosso aplicativo de personal trainer com Inteligência Artificial.
            </p>
        </div>

        <section>
            <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                <Eye className="text-neon w-5 h-5" /> Uso da Câmera
            </h3>
            <p className="mb-2">
                Nosso aplicativo utiliza a câmera do seu dispositivo exclusivamente para:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-1 text-gray-400">
                <li>Identificar máquinas de academia em tempo real.</li>
                <li>Analisar postura ou equipamento para gerar treinos.</li>
            </ul>
            <p className="mt-2 font-semibold text-white/90">
                As imagens são processadas instantaneamente e NÃO são armazenadas em nossos servidores de forma permanente.
            </p>
        </section>

        <section>
            <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                <Database className="text-blue-400 w-5 h-5" /> Coleta de Dados
            </h3>
            <p>
                Coletamos apenas as informações que você fornece voluntariamente para personalizar seus treinos:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-1 mt-2 text-gray-400">
                <li>Nome, idade, peso e altura.</li>
                <li>Nível de experiência e objetivos fitness.</li>
                <li>Informações de login (E-mail e Foto) via Google Auth.</li>
            </ul>
        </section>

        <section>
            <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                <Shield className="text-green-400 w-5 h-5" /> Segurança e IA
            </h3>
            <p>
                Utilizamos a tecnologia Google Gemini (IA) para processar as análises. Os dados enviados para a IA são anonimizados e utilizados estritamente para gerar o feedback do exercício.
            </p>
        </section>

        <section>
            <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                <Lock className="text-purple-400 w-5 h-5" /> Seus Direitos
            </h3>
            <p className="mb-4">
                Você tem total controle sobre seus dados. Todos os dados de perfil são armazenados localmente no seu dispositivo ou vinculados à sua conta segura.
            </p>
            <p>
                Para excluir sua conta e todos os dados associados, acesse as Configurações e utilize a opção "Sair da Conta" ou entre em contato conosco.
            </p>
        </section>

        <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-gray-500 text-xs mb-4">
                Dúvidas? Entre em contato em<br/>
                <span className="text-neon">suporte@fitscanbrasil.com</span>
            </p>
            <Button onClick={onBack} variant="outline" fullWidth>
                Entendi e Concordo
            </Button>
        </div>

      </div>
    </div>
  );
};