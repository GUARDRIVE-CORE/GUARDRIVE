#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import sys
import argparse
import google.generativeai as genai

def configure_api_key():
    """Configura a chave de API do Google Gemini."""
    if 'GOOGLE_API_KEY' in os.environ:
        return os.environ['GOOGLE_API_KEY']
    
    key = input("Digite sua chave de API do Google Gemini: ")
    os.environ['GOOGLE_API_KEY'] = key
    return key

def initialize_gemini(api_key):
    """Inicializa a API do Gemini com a chave fornecida."""
    genai.configure(api_key=api_key)

def list_models():
    """Lista os modelos disponíveis no Google Gemini."""
    models = genai.list_models()
    print("\nModelos disponíveis:")
    for model in models:
        if 'gemini' in model.name.lower():
            print(f" - {model.name}")
            print(f"   Exibição: {model.display_name}")
            print(f"   Geração de conteúdo: {'Sim' if 'generateContent' in model.supported_generation_methods else 'Não'}")
            print(f"   Streaming: {'Sim' if 'streamGenerateContent' in model.supported_generation_methods else 'Não'}")
            print()

def chat_with_gemini(model_name="gemini-pro"):
    """Inicia uma conversa interativa com o modelo Gemini."""
    print(f"\nIniciando chat com o modelo {model_name}...")
    print("Digite 'sair', 'exit' ou 'quit' para encerrar o chat.\n")
    
    model = genai.GenerativeModel(model_name)
    chat = model.start_chat(history=[])
    
    try:
        while True:
            user_input = input("\nVocê: ")
            if user_input.lower() in ['sair', 'exit', 'quit']:
                print("Encerrando chat. Até mais!")
                break
            
            response = chat.send_message(user_input)
            print(f"\nGemini: {response.text}")
    except KeyboardInterrupt:
        print("\nChat interrompido pelo usuário. Até mais!")
    except Exception as e:
        print(f"\nErro ao conversar com o Gemini: {e}")

def send_prompt(prompt, model_name="gemini-pro"):
    """Envia um único prompt para o modelo Gemini e exibe a resposta."""
    model = genai.GenerativeModel(model_name)
    
    try:
        response = model.generate_content(prompt)
        print("\nResposta do Gemini:")
        print(response.text)
    except Exception as e:
        print(f"\nErro ao obter resposta do Gemini: {e}")

def main():
    parser = argparse.ArgumentParser(description='CLI para interagir com a API do Google Gemini')
    parser.add_argument('--chat', action='store_true', help='Iniciar uma conversa interativa com o Gemini')
    parser.add_argument('--models', action='store_true', help='Listar modelos disponíveis')
    parser.add_argument('--model', type=str, default='gemini-pro', help='Nome do modelo a ser usado (padrão: gemini-pro)')
    parser.add_argument('prompt', nargs='?', help='Prompt a ser enviado ao Gemini (opcional)')
    
    args = parser.parse_args()
    
    # Configurar a chave de API
    api_key = configure_api_key()
    initialize_gemini(api_key)
    
    if args.models:
        list_models()
        return
    
    if args.chat:
        chat_with_gemini(args.model)
        return
    
    if args.prompt:
        send_prompt(args.prompt, args.model)
    else:
        # Se nenhuma opção for fornecida, exibir ajuda
        parser.print_help()

if __name__ == "__main__":
    main()

