#pragma once

#include <samchon/Map.hpp>
#include <samchon/library/CriticalAllocator.hpp>

namespace samchon
{
	namespace library
	{
		template <typename _Kty, typename _Ty, typename _Pr = std::less<_Kty>>
		using CriticalMap = Map<_Kty, _Ty, _Pr, CriticalAllocator<std::pair<const std::string, _Ty>>>;
	};
};