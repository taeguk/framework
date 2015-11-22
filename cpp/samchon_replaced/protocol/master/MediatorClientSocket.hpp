#pragma once
#include <samchon/API.hpp>

#include <samchon/protocol/master/MediatorSocket.hpp>
#include <samchon/protocol/ServerConnector.hpp>

namespace samchon
{
	namespace protocol
	{
		namespace master
		{
			class ExternalClientArrayMediator;

			class SAMCHON_FRAMEWORK_API MediatorClientSocket
				: public MediatorSocket,
				public virtual ServerConnector
			{
			private:
				typedef MediatorSocket super;

			protected:
				virtual auto getIP() const -> std::string;
				virtual auto MY_IP() const -> std::string;
				virtual auto PORT() const -> int;

			public:
				MediatorClientSocket(ExternalClientArrayMediator*);
				virtual ~MediatorClientSocket() = default;

				virtual void start();
			};
		};
	};
};